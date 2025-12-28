!function(_) {
    var template = 
    '<li>\
        <div class="date"></div>\
        <div class="wrap">\
        </div>\
    </li>';

    var template2 = 
    '<div class="todo"></div>';

    var deleteTemplate = 
    '<span class="delete"></span>';

    //@param {Object} {date:'2015-04-28',name:'todo1',isFinished:true,content:'完成任务1'}
    function Task(options) {
        this.options = options || {};
        // 即 li节点
        this.container = this._layout.cloneNode(true);
        // date节点，用于设置任务日期
        this.taskDate = this.container.querySelector('.date');
        // 在date节点上定义一个widget属性指向this
        this.taskDate.widget = this;
        // taskWrap节点，用于插入子类
        this.taskWrap = this.container.querySelector('.wrap');
        // 将options 复制到 组件实例上
        _.extend(this, options);
        this._renderUI();
        return this;
    }

    _.extend(Task.prototype,{
        _layout: _.html2node(template),
        // 设置任务日期
        setContent: function(date){
            this.taskDate.innerText = date;
            this.taskDate.id = 'id' + date; // id必须以字母开头
        },
        // 添加任务
        addTodo: function(option){
            var todo = new Todo(option);
            this.todo = todo.container;
            this.taskWrap.appendChild(this.todo);
        },

        // UI渲染初始化
        _renderUI: function() {
            this.date && this.setContent(this.date);
            if(this.name) {
                this.addTodo(this.options);
            }
        },
    });

    //@param {Object} {date:'2015-04-28',name:'todo1',isFinished:true,content:'完成任务1'}
    function Todo(options) {
        options = options || {};
        // 创建包含todo和删除按钮的容器
        this.container = document.createElement('div');
        this.container.style.position = 'relative';
        // 即 todo节点
        this.todoNode = this._layout.cloneNode(true);
        // 删除按钮节点
        this.deleteBtn = this._deleteLayout.cloneNode(true);
        // 在todo节点上定义一个widget属性指向this
        this.todoNode.widget = this;
        
        this.container.appendChild(this.todoNode);
        this.container.appendChild(this.deleteBtn);

        // 将options 复制到 组件实例上
        _.extend(this, options);
        this._renderUI();
        return this;
    }

    _.extend(Todo.prototype,{
        _layout: _.html2node(template2),
        _deleteLayout: _.html2node(deleteTemplate),
        // UI渲染初始化
        _renderUI: function() {
            if(this.date) {
                this.todoNode.setAttribute('data-date',this.date);
            }
            if(this.name) {
                this.todoNode.innerText = this.name;
                this.todoNode.setAttribute('data-name',this.name);
            }
            if(this.isFinished === true) {
                _.addClass(this.todoNode,'z-finished');
            }
            this.todoNode.setAttribute('data-isFinished',this.isFinished);
            if(this.content) {
                this.todoNode.setAttribute('data-content',this.content);
            }
        },
    });
    

    window.Task = Task;
    window.Todo = Todo;

}(util);