"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TreeNode = exports.ActionDTO = exports.SubjectDTO = void 0;
// Clases DTO para enviar el arbol de permisos
class SubjectDTO {
}
exports.SubjectDTO = SubjectDTO;
class ActionDTO {
}
exports.ActionDTO = ActionDTO;
class TreeNode {
    constructor(id, action, description, name) {
        this.id = id;
        this.action = action;
        this.description = description;
        this.childActions = [];
        this.name = name;
    }
}
exports.TreeNode = TreeNode;
