const Button = () => {
  return document.createElement('button');
  console.log('dead-code')
}

const Link = () => {
  return document.createElement('a')
}

const Heading = (level) => {
  return document.createElement('h' + level)
}

export {
  Button,
  Link,
  Heading
}
