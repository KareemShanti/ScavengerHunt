var HintFactory = {
   createHint: function(id, objectName, hint, state) {
    var newObj = {}
    newObj._id=id;
    newObj.objectName = objectName;
    newObj.hint = hint;
    newObj.state = state;

    return newObj;
  },
  createHintWithObject: function(obj) {
    var newObj = {}
    newObj._id=obj._id;
    newObj.objectName = obj.objectName;
    newObj.hint = obj.hint;
    newObj.state = obj.state;

    return newObj;
  }
}

module.exports=HintFactory;
