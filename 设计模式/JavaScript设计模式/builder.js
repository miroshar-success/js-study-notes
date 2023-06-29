// -------------------- 建造者模式 ----------------------
const Human = function(param) {
  this.skill = (param && param.skill) || '保密'
  this.hobby = (param && param.hobby) || '保密'
}
Human.prototype.getSkill = function() {
  return this.skill
}
Human.prototype.getHobby = function() {
  return this.hobby
}
// 工作
const Work = function(work) {
  const _this = this;
  (function(work , _this) {
    switch (work) {
      case 'code':
        _this.work = '工程师';
        _this.work_description = 'enjoying coding'
        break
      case 'ui':
        _this.work = '设计师';
        _this.work_description = '设计是一种艺术'
        break
    }
  })(work, _this)
}
Work.prototype.changeWork = function(work) {
  this.work = work
}
Work.prototype.changeDescription = function(description) {
  this.work_description = description
}
// 姓名
const Named = function(name) {
  const _this = this;
  (function(name, _this) {
    _this.fullName = name
    if (name.indexOf(' ') > 0) {
      const [f, l] = name.split(' ')
      _this.firstName = f
      _this.lastName = l
    }
  })(name, _this)
}

const Person = function(name, work) {
  const _person = new Human()
  _person.name = new Named(name)
  _person.work = new Work(work)
  return _person
}

const person_1 = new Person('kyrie irving', 'code')
const person_2 = new Person('lebron james', 'ui')
console.log(person_1, person_2)
/**
Human {
  skill: '保密',
  hobby: '保密',
  name: Named {
    fullName: 'kyrie irving',
    firstName: 'kyrie',
    lastName: 'irving'
  },
  work: Work { work: '工程师', work_description: 'enjoying coding' }
}

Human {
  skill: '保密',
  hobby: '保密',
  name: Named {
    fullName: 'lebron james',
    firstName: 'lebron',
    lastName: 'james'
  },
  work: Work { work: '设计师', work_description: '设计是一种艺术' }
}
*/
const Employee = function(name, work) {
  const _person = new Human({
    skill: '腿特长',
    hobby: '旅行, 美食'
  })
  _person.name = new Named(name)
  _person.work = new Work(work)
  return _person
}
const employee_1 = new Employee('hello world', 'code')
const employee_2 = new Employee('你好 世界', 'ui')
console.log(employee_1, employee_2)
/**
 * 
 * Human {
    skill: '腿特长',
    hobby: '旅行, 美食',
    name: Named {
      fullName: 'hello world',
      firstName: 'hello',
      lastName: 'world'
    },
    work: Work { work: '工程师', work_description: 'enjoying coding' }
  } 
  
  Human {
    skill: '腿特长',
    hobby: '旅行, 美食',
    name: Named { fullName: '你好 世界', firstName: '你好', lastName: '世界' },
    work: Work { work: '设计师', work_description: '设计是一种艺术' }
  }
 * 
*/