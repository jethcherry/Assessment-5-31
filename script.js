var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
// Class to create the todoList
var ToDoList = /** @class */ (function () {
    function ToDoList() {
        this.baseUrl = "http://localhost:3000/todos";
    }
    ToDoList.getInstance = function () {
        if (!ToDoList.instance) {
            ToDoList.instance = new ToDoList();
        }
        return ToDoList.instance;
    };
    ToDoList.prototype.createAsync = function (title) {
        return __awaiter(this, void 0, void 0, function () {
            var newTodo;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        newTodo = {
                            title: title,
                            completed: false
                        };
                        return [4 /*yield*/, fetch(this.baseUrl, {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify(newTodo)
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ToDoList.prototype.fetchTodoList = function () {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fetch(this.baseUrl)];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response.json()];
                }
            });
        });
    };
    //logic to update the to do list items
    ToDoList.prototype.updateTodoList = function (todo) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fetch("".concat(this.baseUrl, "/").concat(todo.id), {
                            method: "PUT",
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(todo)
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    //logic to delete the items
    ToDoList.prototype.deleteTodoList = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fetch("".concat(this.baseUrl, "/").concat(id), {
                            method: "DELETE",
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return ToDoList;
}());
var RenderTodos = /** @class */ (function () {
    function RenderTodos() {
    }
    RenderTodos.render = function (todos) {
        return __awaiter(this, void 0, void 0, function () {
            var toDolistContainer;
            var _this = this;
            return __generator(this, function (_a) {
                toDolistContainer = document.getElementById("list");
                if (!toDolistContainer)
                    return [2 /*return*/];
                toDolistContainer.innerHTML = "";
                // render to do list elements
                todos.forEach(function (todo) {
                    var listItem = document.createElement('li');
                    listItem.className = 'item';
                    listItem.innerHTML = "\n                <input type=\"checkbox\" ".concat(todo.completed ? 'checked' : '', ">\n                <label class=\"").concat(todo.completed ? 'completed' : '', "\">").concat(todo.title, "</label>\n                <button>Delete</button>\n            ");
                    var checkbox = listItem.querySelector('input[type="checkbox"]');
                    var deleteBtn = listItem.querySelector('button');
                    if (deleteBtn) {
                        checkbox.addEventListener('change', function () { return __awaiter(_this, void 0, void 0, function () {
                            var _a, _b;
                            return __generator(this, function (_c) {
                                switch (_c.label) {
                                    case 0:
                                        todo.completed = checkbox.checked;
                                        return [4 /*yield*/, ToDoList.getInstance().updateTodoList(todo)];
                                    case 1:
                                        _c.sent();
                                        _b = (_a = RenderTodos).render;
                                        return [4 /*yield*/, ToDoList.getInstance().fetchTodoList()];
                                    case 2:
                                        _b.apply(_a, [_c.sent()]);
                                        return [2 /*return*/];
                                }
                            });
                        }); });
                        deleteBtn.addEventListener('click', function () { return __awaiter(_this, void 0, void 0, function () {
                            var _a, _b;
                            return __generator(this, function (_c) {
                                switch (_c.label) {
                                    case 0: return [4 /*yield*/, ToDoList.getInstance().deleteTodoList(todo.id)];
                                    case 1:
                                        _c.sent();
                                        _b = (_a = RenderTodos).render;
                                        return [4 /*yield*/, ToDoList.getInstance().fetchTodoList()];
                                    case 2:
                                        _b.apply(_a, [_c.sent()]);
                                        return [2 /*return*/];
                                }
                            });
                        }); });
                    }
                    toDolistContainer.appendChild(listItem);
                });
                return [2 /*return*/];
            });
        });
    };
    return RenderTodos;
}());
document.addEventListener("DOMContentLoaded", function () { return __awaiter(_this, void 0, void 0, function () {
    var toDoList, form, _a, _b;
    var _this = this;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                toDoList = ToDoList.getInstance();
                form = document.getElementById('form');
                form.addEventListener('submit', function (event) { return __awaiter(_this, void 0, void 0, function () {
                    var input, title, _a, _b;
                    return __generator(this, function (_c) {
                        switch (_c.label) {
                            case 0:
                                event.preventDefault();
                                input = document.getElementById('input');
                                title = input.value.trim();
                                if (!title) return [3 /*break*/, 3];
                                return [4 /*yield*/, toDoList.createAsync(title)];
                            case 1:
                                _c.sent();
                                input.value = '';
                                _b = (_a = RenderTodos).render;
                                return [4 /*yield*/, toDoList.fetchTodoList()];
                            case 2:
                                _b.apply(_a, [_c.sent()]);
                                _c.label = 3;
                            case 3: return [2 /*return*/];
                        }
                    });
                }); });
                _b = (_a = RenderTodos).render;
                return [4 /*yield*/, toDoList.fetchTodoList()];
            case 1:
                _b.apply(_a, [_c.sent()]);
                return [2 /*return*/];
        }
    });
}); });
