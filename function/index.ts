function* generateStuff() {
  yield 1
  yield 2
  let proceed = yield 3
  if (proceed) {
    yield 4
  }
  return 'done'
}