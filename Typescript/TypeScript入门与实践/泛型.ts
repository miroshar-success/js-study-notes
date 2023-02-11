// ---------- 泛型 -------------
const identity_fn = <T>(arg:T): T => arg
const number_result = identity_fn<number>(123)
const string_result = identity_fn<string>('123')
const boolean_result = identity_fn<boolean>(false)

