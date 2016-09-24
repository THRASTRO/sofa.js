/* Generate Test Data for rxp */

#include <stdio.h>
#include "sofa.h"
#include "config.h"
#include <string.h>

int main()
{
  double t0[3][3];
  double _t0[3][3];
  double t1[3];
  unsigned long long modulo = 0;
  printf("var rxp_results = [\n");
  long mod0 = 0;
  for (_t0[0][0] = 0; _t0[0][0] <= 1; _t0[0][0] += 1) {
  for (_t0[0][1] = 0; _t0[0][1] <= 1; _t0[0][1] += 1) {
  for (_t0[0][2] = 0; _t0[0][2] <= 1; _t0[0][2] += 1) {
  for (_t0[1][0] = 0; _t0[1][0] <= 1; _t0[1][0] += 1) {
  for (_t0[1][1] = 0; _t0[1][1] <= 1; _t0[1][1] += 1) {
  for (_t0[1][2] = 0; _t0[1][2] <= 1; _t0[1][2] += 1) {
  for (_t0[2][0] = 0; _t0[2][0] <= 1; _t0[2][0] += 1) {
  for (_t0[2][1] = 0; _t0[2][1] <= 1; _t0[2][1] += 1) {
  for (_t0[2][2] = 0; _t0[2][2] <= 1; _t0[2][2] += 1) {
    mod0 ++;
    if (mod0 > 65536) mod0 = 0;
    if (mod0 != 1) continue;
    long mod1 = 0;
    for (t1[0] = -0.04124432; t1[0] <= 0.04124432; t1[0] += 0.03093324) {
    for (t1[1] = -0.04124432; t1[1] <= 0.04124432; t1[1] += 0.03093324) {
    for (t1[2] = -0.04124432; t1[2] <= 0.04124432; t1[2] += 0.03093324) {
      mod1 ++;
      if (mod1 > 65536) mod1 = 0;
      if (mod1 != 1) continue;

      double res0[3] = {0};
      modulo = modulo > 4
        ? 0 : modulo + 1;
      if (modulo != 1) continue;
    memcpy(&t0, &_t0, sizeof t0);
      printf("  [");
      exportMAT33(t0);
      printf(", ");
      exportV3(t1);
      printf(", ");
      iauRxp(t0, t1, res0);
      exportV3(res0);
      printf("  ],\n");

    }
    }
    }
  }
  }
  }
  }
  }
  }
  }
  }
  }

  printf("];\n");
}
