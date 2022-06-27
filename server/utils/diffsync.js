const DiffMatchPatch = require("diff-match-patch");

class DifferentialSynchronizationServer {
  constructor() {
    this.dmp = new DiffMatchPatch();
    this.clientShadows = {};
  }

  addShadow(initialState, docId, clientID) {
    initialState = this.convertToText(initialState);
    try {
      this.clientShadows[docId][clientID] = initialState;
    } catch (e) {
      this.clientShadows[docId] = {};
      this.clientShadows[docId][clientID] = initialState;
    }
  }

  getPatchesToMatchText(text, docId, clientID) {
    text = this.convertToText(text);
    const shadow = this.clientShadows[docId][clientID];
    // console.log("*************");
    // console.log(typeof text);
    // console.log(typeof shadow);
    // console.log("************");
    const patches = this.dmp.patch_make(shadow, text);
    return this.dmp.patch_toText(patches);
  }

  getPatchesFrom1To2(text1, text2) {
    text1 = this.convertToText(text1);
    text2 = this.convertToText(text2);
    const patches = this.dmp.patch_make(text1, text2);
    return this.dmp.patch_toText(patches);
  }

  applyPatchesToShadow(patches, docId, clientID) {
    patches = this.convertToPatches(patches);
    const shadow = this.clientShadows[docId][clientID];
    const new_text = this.dmp.patch_apply(patches, shadow)[0];
    this.clientShadows[docId][clientID] = new_text;
  }

  applyPatchesToText(patches, text) {
    patches = this.convertToPatches(patches);
    text = this.convertToText(text);
    return this.dmp.patch_apply(patches, text)[0];
  }

  updateShadow(text, docId, clientID) {
    text = this.convertToText(text);
    this.clientShadows[docId][clientID] = text;
  }

  deleteShadow(docId) {
    delete this.clientShadows[docId];
  }

  convertToText(obj) {
    if (typeof obj === "string" || obj instanceof String) return obj;
    return JSON.stringify(obj);
  }

  convertToPatches(str) {
    if (typeof str === "string" || str instanceof String) {
      return this.dmp.patch_fromText(str);
    }
    return str;
  }
}

exports.DifferentialSynchronizationServer = DifferentialSynchronizationServer;
