"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
let currentUser = { user: "peter", roles: [{ role: "user" }, { role: "admin" }] };
function IsInRole(role) {
    return currentUser.roles.some(r => r.role === role);
}
function Role(role) {
    return function (target, propertyKey, descriptor) {
        let originalMethod = descriptor.value;
        descriptor.value = function () {
            if (IsInRole(role)) {
                originalMethod.apply(this, arguments);
            }
            else {
                console.log(`${currentUser.user} is not in the ${role} role`);
            }
        };
        return descriptor;
    };
}
function Admin(target, propertyKey, descriptor) {
    let originalMethod = descriptor.value;
    descriptor.value = function () {
        if (IsInRole('admin')) {
            originalMethod.apply(this, arguments);
        }
        else {
            console.log(`${currentUser.user} is not in the admin role`);
        }
    };
    return descriptor;
}
class NoRoleCheck {
    AnyoneCanRun(args) {
        console.log(args);
    }
    AdminOnly(args) {
        console.log(args);
    }
}
class RoleCheck {
    AnyoneCanRun(args) {
        if (!IsInRole("user")) {
            console.log(`${currentUser.user} is not in the user role`);
            return;
        }
        console.log(args);
    }
    AdminOnly(args) {
        if (!IsInRole("admin")) {
            console.log(`${currentUser.user} is not in the admin role`);
            return;
        }
        console.log(args);
    }
}
class DecoratedExampleMethodDecoration {
    AnyoneCanRun(args) {
        console.log(args);
    }
    AdminOnly(args) {
        console.log(args);
    }
}
__decorate([
    Role("user")
], DecoratedExampleMethodDecoration.prototype, "AnyoneCanRun", null);
__decorate([
    Role("admin")
], DecoratedExampleMethodDecoration.prototype, "AdminOnly", null);
function TestDecoratorExample(decoratorMethod) {
    console.log(`Currrent user ${currentUser.user}`);
    decoratorMethod.AnyoneCanRun(`Running as user`);
    decoratorMethod.AdminOnly(`Running as admin`);
}
TestDecoratorExample(new NoRoleCheck());
TestDecoratorExample(new DecoratedExampleMethodDecoration());
currentUser = { user: "bob", roles: [{ role: "user" }] };
TestDecoratorExample(new DecoratedExampleMethodDecoration());
TestDecoratorExample(new RoleCheck());
