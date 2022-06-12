export const msgFormat = (_channel: string, _msg: string, _name: string, _type: string) => {
  return {
    channel: _channel,
    message: _msg,
    name: _name,
    type: _type
  }
}