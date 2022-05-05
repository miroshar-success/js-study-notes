// ------ when you don't want to repeat yourself --------

interface PlayerProps {
  firstName: string
  lastName: string
  age: number
}

type PlayerPropsKey = keyof PlayerProps

type NewPlayerProps = {
  [property in keyof PlayerProps]: string
}

type OptionsFlags<Type> = {
  [Property in keyof Type]: boolean
}

type FeatureFlags = {
  darkMode:() => void
  newUserProfile: () => void
}

type FeatureOptions = OptionsFlags<FeatureFlags>

// --------- mapping modifiers -----------
