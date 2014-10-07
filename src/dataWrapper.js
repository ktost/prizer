'use strict';

var wrapper = {
    
    

    /**
     * Wrap data into a standardized format
     * @param {*} input
     * @returns {{id: String, data: *}}
     */
    wrap: function(data) {
        var wrappedData = {
            id: data._id || data.id || data,
            data: data,
            date: new Date()
        };
        return wrappedData;
    },

    
    /**
     * Return wrapped data to original state
     * @param {Object} wrappedData data that was previously wrapped
     * @returns {*}
     */
    unwrap: function(wrappedData) {
        return wrappedData.data;
    }
    
};

module.exports = wrapper;

