describe('set', function() {
  var set;

  beforeEach(function() {
    set = Set();
  });

  it('should have methods named "add", "contains", "remove" and "count"', function() {
    expect(set.add).to.be.a('function');
    expect(set.contains).to.be.a('function');
    expect(set.remove).to.be.a('function');
    expect(set.count).to.be.a('function');
  });

  it('should add values to a set', function() {
    set.add('Susan Sarandon');
    set.add('Danny Glover');
    expect(set.contains('Danny Glover')).to.equal(true);
    expect(set.contains('Susan Sarandon')).to.equal(true);
  });

  it('should remove values from a set', function() {
    set.add('Mel Gibson');
    set.remove('Mel Gibson');
    expect(set.contains('Mel Gibson')).to.equal(false);
  });

  it('should count how many values are in the set', function() {
    set.add('Susan Sarandon');
    set.add('Danny Glover');
    set.add('Mel Gibson');
    expect(set.count()).to.equal(3);
    set.remove('Mel Gibson');
    expect(set.count()).to.equal(2);
  });

});
