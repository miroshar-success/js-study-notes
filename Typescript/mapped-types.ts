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
// mapping modifiers
type CreateMutable<Type> = {
  -readonly [property in keyof Type]: Type[property]
}
type CreateUnLockedMutable<Type> = {
  +readonly [property in keyof Type]: Type[property]
}

type LockedAccount = {
  readonly id: number;
  readonly name: string
}
type UnLockedAccount = {
  id: number
  name: string
}

type UnlockedAccount = CreateMutable<LockedAccount>
type lockedAccount = CreateUnLockedMutable<UnLockedAccount>


// ------ removes optional attributes -------
type Concrete<Type> = {
  [property in keyof Type]-?: Type[property]
}
type MaybeUser = {
  id: number
  name?: string;
  age?: number
}
type User = Concrete<MaybeUser>

