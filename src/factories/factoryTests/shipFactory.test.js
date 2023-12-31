import Ship from '../shipFactory';

const carrier = new Ship('carrier', 5);
const carrierObjTest = {
    'name': 'carrier',
    'length': 5,
    'damage': 0,
    'sunk': false
}

test('creates a ship object correctly', () => {
    expect(carrier).toEqual(carrierObjTest)
})

test('ship takes damage when hit', () => {
    carrier.hit();
    expect(carrier.damage).toBe(1);
})

test('ship is not sunk', () => {
    expect(carrier.sunk).toBe(false);
})

test('ship sinks', () => {
    for (let i=0; i < 4; i++){
        carrier.hit()
    }
    expect(carrier.sunk).toBe(true);
})
