import DiffMatchPatch from "diff-match-patch";

export class DifferentialSynchronizationClient {
  constructor() {
    this.dmp = new DiffMatchPatch();
    this.clientShadow = null;
  }

  initShadow(initialState) {
    initialState = this.convertToText(initialState);
    this.clientShadow = initialState;
  }

  getPatchesToMatchText(text) {
    text = this.convertToText(text);
    const patches = this.dmp.patch_make(this.clientShadow, text);
    console.log("patches", patches);
    return this.dmp.patch_toText(patches);
  }

  getPatchesFrom1To2(text1, text2) {
    text1 = this.convertToText(text1);
    text2 = this.convertToText(text2);
    const patches = this.dmp.patch_make(text1, text2);
    return this.dmp.patch_toText(patches);
  }

  applyPatchesToShadow(patches) {
    patches = this.convertToPatches(patches);
    const new_text = this.dmp.patch_apply(patches, this.clientShadow)[0];
    this.clientShadow = new_text;
  }

  applyPatchesToText(patches, text) {
    patches = this.convertToPatches(patches);
    // text = this.convertToPatches(text)
    return this.dmp.patch_apply(patches, text)[0];
  }

  updateShadow(text) {
    text = this.convertToText(text);
    this.clientShadow = text;
  }

  deleteShadow(docId) {
    delete this.clientShadow;
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
