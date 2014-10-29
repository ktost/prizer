describe('dataWrapper', function() {
    'use strict';
    
    var wrapper = require('../src/dataWrapper');
    
    
    describe('wrap', function() {
        it('should wrap data into an object\'s data field', function() {
            var wrapped = wrapper.wrap('somedata');
            expect(wrapped.data).toBe('somedata');
        });
        it('should include the date', function() {
            var wrapped = wrapper.wrap('something');
            expect(wrapped.date - new Date()).toBeLessThan(1000);
        });
        describe('id', function() {
            it('should equal string if string is passed in', function() {
                var wrapped = wrapper.wrap('hi');
                expect(wrapped.id).toBe('hi');
            });
            it('should equal number if number is passed in', function() {
                var wrapped = wrapper.wrap(123);
                expect(wrapped.id).toBe(123);
            });
            it('should equal an _id field from an object', function() {
                var wrapped = wrapper.wrap({_id: 'phill'});
                expect(wraped.id).toBe('phill');
            });
            it('should equal an id field from an object', function() {
                var wrapped = wrapper.wrap({id: 'phone'});
                expect(wrapped.id).toBe('phone');
            });
            it('should equal undefined if array is passed in', function() {
                var wrapped = wrapper.wrap([1, 2, 3]);
                expect(wrapped.id).toBeUndefined();
            });
            it('should equal undefined if object without an id or _id field is passed in', function() {
                var wrapped = wrapper.wrap({name: 'Weeble'});
                expect(wrapped.id).toBeUndefined();
            });
        });
    });
    
    
    describe('unwrap', function() {
        
    });
    
});