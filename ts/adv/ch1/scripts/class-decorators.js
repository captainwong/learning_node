"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
let classUser = { user: "peter", roles: [{ role: "user" }, { role: "admi1n" }] };
function IsInRoleClass(role) {
    return classUser.roles.some(r => r.role === role);
}
function RoleClass(role) {
    return function (constructor) {
        if (!IsInRoleClass(role)) {
            throw new Error(`The user is not authorized to access this class`);
        }
    };
}
let RestrictedClass = class RestrictedClass {
    constructor() {
        console.log(`Inside the constructor`);
    }
    Validate() {
        console.log(`Validating`);
    }
};
RestrictedClass = __decorate([
    RoleClass("admin")
], RestrictedClass);
// will throw
let clazz = new RestrictedClass();
