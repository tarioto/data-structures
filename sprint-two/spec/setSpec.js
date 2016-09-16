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

  it('should handle numbers as well as strings', function() {
    set.add('Susan Sarandon');
    set.add('Danny Glover');
    set.add(4);
    set.add(9);
    expect(set.count()).to.equal(4);
    expect(set.contains(4)).to.equal(true);
    set.remove(4);
    expect(set.contains(4)).to.equal(false);
    expect(set.count()).to.equal(3);
  });

  it('should handle input objects of any type', function() {
    set.add('1,2,3');
    set.add('Danny Glover');
    set.add(4);
    set.add(9);
    set.add([1, 2, 3]);
    set.add({});
    expect(set.count()).to.equal(6);
    expect(set.contains([1, 2, 3])).to.equal(true);
    expect(set.contains({})).to.equal(true);
    set.remove([1, 2, 3]);
    expect(set.contains([1, 2, 3])).to.equal(false);
    set.remove({});
    expect(set.contains({})).to.equal(false);
    expect(set.count()).to.equal(4);
  });

});
