'use babel';

import SlotZeusView from './slot-zeus-view';
import { CompositeDisposable } from 'atom';

export default {

  slotZeusView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.slotZeusView = new SlotZeusView(state.slotZeusViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.slotZeusView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'slot-zeus:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.slotZeusView.destroy();
  },

  serialize() {
    return {
      slotZeusViewState: this.slotZeusView.serialize()
    };
  },

  toggle() {
    console.log('SlotZeus was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
