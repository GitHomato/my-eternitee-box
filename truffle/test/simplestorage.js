const GenerateToken = artifacts.require("GenerateToken");

contract('GenerateToken', () => {
  it('should read newly written values', async() => {
    const GenerateTokenInstance = await GenerateToken.deployed();
    var value = (await GenerateTokenInstance.read.call()).toNumber();

    assert.equal(value, 0, "0 wasn't the initial value");

    await GenerateTokenInstance.write(1);
    value = (await GenerateTokenInstance.read.call()).toNumber();
    assert.equal(value, 1, "1 was not written");

    await GenerateTokenInstance.write(2);
    value = (await GenerateTokenInstance.read.call()).toNumber();
    assert.equal(value, 2, "2 was not written");
  });
});
