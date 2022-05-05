interface IdLabel {
  id: number
}

interface NameLabel{
  name: string
}

function createLabel1(id: number): IdLabel {
  return {
    id
  }
}
function createLabel2(name: string): NameLabel {
  return {
    name
  }
}
function createLabel3(nameOrId: string | number): IdLabel | NameLabel {
  if(typeof nameOrId === 'string') {
    return {
      name: nameOrId
    }
  }else {
    return {
      id: nameOrId
    }
  }
}

createLabel1(1)
createLabel2('hello')


type NameOrId <T extends number | string> = T extends number
  ? IdLabel
  : NameLabel;



type MessageOf<T extends {message: string}> = T['message']
interface Email {
  message: string
}
type EmailMessageContent = MessageOf<Email>
