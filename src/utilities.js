/*
Name: Timothy Luciani
Class: CS527
File: utilities.js
*/
"use strict";
const Utilities = function(){
  /* Global Definitions */
  const FLOOR_RESTITUTION  = 0.7,
         particle_def = { position:{x:0,y:0}, velocity:{x:0,y:0}, forces: {x:0,y:0}, mass: 1.0/*kg*/, radius: 25.0,/*cm*/
                          motion: true, collision: false, deformation : 50.0 };
  return {
    /* Vector Math Utilities */
    Vector_Utils: function() {
      return {

        /* Add all components of a and b*/
        add: function(a, ...b) {
          let c = {};
          _.keys(a).forEach(function(key){
            c[key] = a[key];
            for(let B of b){
              c[key] += B[key];
            }
          });
          return c;
        },

        /* Difference all components of a and b */
        subtract: function(a, ...b) {
          let c = {};
          _.keys(a).forEach(function(key){
            c[key] = a[key];
            for(let B of b){
              c[key] -= B[key];
            }
          });
          return c;
        },

        /* Multiple all components of a with s */
        multiply: function(a, ...s) {
          let c = {};
          _.keys(a).forEach(function(key){
            c[key] = a[key];
            for(let S of s){
              c[key] *= S;
            }
          });
          return c;
        },

        /* Divide all components of a by s */
        divide: function(a, ...s) {
          let c = {};
          _.keys(a).forEach(function(key){
            c[key] = a[key];
            for(let S of s){
              c[key] /= S;
            }
          });
          return c;
        },

        /* Divide all components by 2 */
        shift_divide: function(a) {
          let c = {};
          _.keys(a).forEach(function(key){
            c[key] = a[key] >> 1;
          });
          return c;
        },

        /* Multiply all components by 2 */
        shift_multiply: function(a) {
          let c = {};
          _.keys(a).forEach(function(key){
            c[key] = a[key] << 1;
          });
          return c;
        },

        /* Multiple all components of a with s */
        multiply_components: function(a,b) {
          let c = {};
          _.keys(a).forEach(function(key){
            c[key] = a[key] * b[key]
          });
          return c;
        },

        /* Get the magnitude of the vector */
        magnitude: function(a) {
          return Math.sqrt(Utilities.Vector_Utils.dot(a,a));
        },

        /* Get the magnitude of the vector */
        sqrt_component: function(a) {
          let c = {};
          _.keys(a).forEach(function(key){
            let sign = Math.sign(a[key]);
            c[key] = sign * Math.sqrt(sign * a[key]);
          });
          return c;
        },

        /* Zero out all values */
        zero: function(a) {
          let c = {};
          _.keys(a).forEach(function(key){
            c[key] = 0
          });
          return c;
        },

        /* Dot vectors a and b */
        dot: function(a,b) {
          let c = 0;
          _.keys(a).forEach(function(key){
            c += a[key] * b[key];
          });
          return c;
        },
      }
    }(),

    /* Utilities for checking model conditions and create elements */
    Model_Utils : function() {
      return{
          createParticle: function(position, velocity) {
            /* Clone the particle template*/
            let particle = _.cloneDeep(particle_def);
            /* Set the position and velocity if supplied */
            if(position){
              particle.position = position;
            }
            if(velocity){
              particle.velocity = velocity;
            }
            return particle;
          }
        }
    }()
  };

}();