# Runge-Kutta-4-Integration

## Library Requirements:
* Lodash (https://lodash.com/)

## Files:
* utilities.js
    * Vector Math Library I implemented that the integration code relies on (you're welcome!)
    * Model Utility Library that creates particles

* integration_schemes.js
    * Euler integration (because why not)
    * RK4 integration

```html
<!-- Lodash Library -->
<script type="application/javascript" src="lib/lodash.min.js"></script>

<!-- New Codes -->
<script type="application/javascript" src="src/utilities.js"></script>
<script type="application/javascript" src="src/integration_schemes.js"></script>
```

## Usage:
The integration schemes are implemented as a static library. Both functions take a particles object (
```javascript
{ position:[0,0], velocity:{x:0,y:0}, forces: {x:0,y:0}, mass: 1.0/*kg*/, radius: 25.0} )
```
 and the delta time.

```javascript
// How to use Euler
Integration.euler_step(p, 1.0/33.0);

// How to use RK4
Integration.RK4_step(p, 1.0/33.0);
```

## Implementation:

```javascript
function RK4(p, dt) {
  /* Calculate the initial acceleration */
  let acceleration = clearAndAccumulateForces(p);
  /* K1 -- Euler */
  let k1 = multiply(acceleration,dt),
      /* Save k1/2.0 for later use */
      k1over2 = shift_divide(k1),
      /* Euler Velocity = v*dt */
      d_v1 = multiply(p.velocity, dt, 100.0 /*m->cm*/),
      /* Calculate the euler midpoint position: p1 = p0 * (v*dt)/2.0 */
      p1 = create_particle( add(p.position, shift_divide(d_v1)) );

  /* Calculate the acceleration at the Euler position */
  acceleration = clearAndAccumulateForces(p1);
  /* K2 -- First Midpoint */
  let k2 = multiply(acceleration,dt),
      /* Save k2/2.0 for later use */
      k2over2 = shift_divide(k2),
      /* Midpoint velocity: d_v2 = dt * (v0 + k1/2.0) */
      dv_2 = multiply(add(p.velocity, k1over2), dt, 100.0 /*m->cm*/),
      /* Calculate the midpoint position: p2 = p0 * (v*dt)/2.0 */
      p2 = create_particle( add(p.position, shift_divide(dv_2)) );

  /* Calculate the acceleration at the first midpoint position */
  acceleration = clearAndAccumulateForces(p2);
  /* K3 -- Second Midpoint */
  let k3 = multiply(acceleration,dt),
      /* Midpoint velocity: d_v3 = dt * (v0 + k2) */
      dv_3 = multiply( add(p.velocity, k2over2), dt, 100.0 /*m->cm*/),
      /* Calculate the midpoint position: p2 = p0 * (v*dt)/2.0 */
      p3 = create_particle( add(p.position, dv_3) );

  /* Calculate the acceleration at the last midpoint */
  acceleration = clearAndAccumulateForces(p3);
  /* K4 -- Last Midpoint */
  let k4 = multiply(acceleration,dt),
      /* Midpoint velocity: d_v3 = dt * (v0 + k3) */
      dv_4 = multiply( add(p.velocity, k3), dt, 100.0 /*m->cm*/);

  /* Set the new position */
  p.position = add(p.position,
                    multiply(d_v1, 0.16667),
                    multiply(dv_2, 0.33334),
                    multiply(dv_3, 0.33334),
                    multiply(dv_4, 0.16667));

  /* Set the new velocity */
  p.velocity = add(p.velocity,
                      multiply(k1, 0.16667),
                      multiply(k2, 0.33334),
                      multiply(k3, 0.33334),
                      multiply(k4, 0.16667));
}
```

