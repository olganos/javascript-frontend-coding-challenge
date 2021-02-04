export default class Autocomplete {
  constructor(rootEl, options = {}) {
    Object.assign(this, { rootEl, options });

    this.init();
  }

  async onQueryChange(query) {
    // Get data for the dropdown 
    const { getListItems } = this.options;
    if (typeof getListItems === 'function') {
      const results = await getListItems(query);
      this.updateDropdown(results);
    }
    this.selectedListItem = null;
  }

  updateDropdown(results) {
    this.listEl.innerHTML = '';
    this.listEl.appendChild(this.createResultsEl(results));
  }

  navigateByResultList(code) {
    const listItems = this.listEl.getElementsByTagName('li');
    if (code === 'ArrowUp' && code === 'ArrowDown'
      && code === 'Enter' && listItems.length <= 0)
      return;

    switch (code) {
      case 'ArrowUp':
        if (!this.selectedListItem || !this.selectedListItem.previousSibling)
          return;
        this.selectedListItem.classList.remove('selected');
        this.selectedListItem = this.selectedListItem.previousSibling;
        this.selectedListItem.classList.add('selected');
        break;
      case 'ArrowDown':
        if (!this.selectedListItem) {
          this.selectedListItem = listItems[0];
        } else if (this.selectedListItem.nextSibling !== null) {
          this.selectedListItem.classList.remove('selected');
          this.selectedListItem = this.selectedListItem.nextSibling;
        } else {
          return;
        }
        this.selectedListItem.classList.add('selected');
        break;
      case 'Enter':
        if (this.selectedListItem) {
          this.onSelectItem(this.selectedListItem.getAttribute('data-value'));
        }
        break;
    }
  }

  onSelectItem(value) {
    const { onSelect } = this.options;
    if (typeof onSelect === 'function') onSelect(value);
  }

  createResultsEl(results) {
    const fragment = document.createDocumentFragment();
    if (!results)
      return fragment;

    results.forEach((result) => {
      const el = document.createElement('li');
      Object.assign(el, {
        className: 'result',
        textContent: result.text,
      });
      el.setAttribute('data-value', result.value);

      // Pass the value to the onSelect callback
      el.addEventListener('click', (event) => {
        this.onSelectItem(result.value);
      });

      fragment.appendChild(el);
    });
    return fragment;
  }

  createQueryInputEl() {
    const inputEl = document.createElement('input');
    Object.assign(inputEl, {
      type: 'search',
      name: 'query',
      autocomplete: 'off'
    });

    inputEl.addEventListener('input', async event =>
      await this.onQueryChange(event.target.value));

    return inputEl;
  }

  init() {
    // Build query input
    this.inputEl = this.createQueryInputEl();
    this.rootEl.appendChild(this.inputEl)

    // Build results dropdown
    this.listEl = document.createElement('ul');
    Object.assign(this.listEl, { className: 'results' });
    this.rootEl.appendChild(this.listEl);

    this.selectedListItem;
    this.rootEl.addEventListener('keydown', event => this.navigateByResultList(event.code));
  }
}
