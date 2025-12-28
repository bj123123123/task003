!function(_) {
    var template = 
    '<li>\
        <div class="date"></div>\
        <div class="wrap">\
        </div>\
    </li>';

    var template2 = 
    '<div class="todo"></div>';

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
            this.todo = new Todo(option).container
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
        // 创建容器节点
        this.container = this._layout.cloneNode(true);
        // 获取todo节点
        this.todoNode = this.container;
        
        // 确保节点存在
        if (!this.todoNode) {
            console.error('Todo node not found in template');
            return;
        }
        
        // 在todo节点上定义一个widget属性指向this
        this.todoNode.widget = this;

        // 将options 复制到 组件实例上
        _.extend(this, options);
        this._renderUI();
        this._initEvent();
        return this;
    }

    _.extend(Todo.prototype,{
        _layout: _.html2node(template2),
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
        // 初始化事件
        _initEvent: function() {
            var that = this;
            // 暂时移除删除功能，因为模板中没有删除按钮
            // _.addEvent(this.deleteBtn, 'click', function(event) {
            //     event = event || window.event;
            //     if(event.stopPropagation) {
            //         event.stopPropagation();
            //     } else {
            //         event.cancelBubble = true;
            //     }
            //     that.deleteTodo();
            // });
        },
        // 删除任务
        deleteTodo: function() {
            var container = this.container;
            container.parentNode.removeChild(container);
        },
    });
    

    window.Task = Task;
    window.Todo = Todo;

}(util);