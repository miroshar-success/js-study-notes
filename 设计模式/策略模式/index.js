// ------- 策略模式 --------
const USER_ORDINARY = 'user/ordinary',
USER_MEMBER = 'user/member',
USER_VIP = 'user/vip'

class User {
  constructor(type) {
    this.type = type;
  }
  buy() {
    const type = this.type
    switch(type) {
      case USER_ORDINARY:
        console.log('普通用户购买')
        break;
      case USER_MEMBER:
        console.log('会员购买');
        break;
      case USER_VIP:
        console.log('vip购买')
        break;
    }
  }
}

const user_ordinary = new User(USER_ORDINARY)
const user_member = new User(USER_MEMBER)
const user_vip = new User(USER_VIP)

user_ordinary.buy()
user_member.buy()
user_vip.buy()


class OrdinaryUser {
  buy() {
    console.log('普通用户购买...')
  }
}
class MemberUser {
  buy() {
    console.log('普通会员购买...')
  }
}
class VipUser {
  buy() {
    console.log('vip会员购买...')
  }
}
const o_user = new OrdinaryUser()
const m_user = new MemberUser()
const v_user = new VipUser()
o_user.buy()
m_user.buy()
v_user.buy()
