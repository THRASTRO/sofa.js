/* Generate Test Data for rxpv */

#include <stdio.h>
#include "sofa.h"
#include "config.h"
#include <string.h>

int main()
{
  double t0[3][3];
  double _t0[3][3];
  double t1[2][3];
  unsigned long long modulo = 0;
  printf("var rxpv_results = [\n");
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
    if (mod0 > 3200000) mod0 = 0;
    if (mod0 != 1) continue;
    for (t1[0][0] = - 1.73333 * 0.0 - 1; t1[0][0] <= + 1.73333 * 1.0 - 1; t1[0][0] += 1.73333) {
    for (t1[1][0] = - 1.73333 * 0.0 - 1; t1[1][0] <= + 1.73333 * 1.0 - 1; t1[1][0] += 1.73333) {
    for (t1[0][1] = - 1.73333 * 0.0 - 1; t1[0][1] <= + 1.73333 * 1.0 - 1; t1[0][1] += 1.73333) {
    for (t1[1][1] = - 1.73333 * 0.0 - 1; t1[1][1] <= + 1.73333 * 1.0 - 1; t1[1][1] += 1.73333) {
    for (t1[0][2] = - 1.73333 * 0.0 - 1; t1[0][2] <= + 1.73333 * 1.0 - 1; t1[0][2] += 1.73333) {
    for (t1[1][2] = - 1.73333 * 0.0 - 1; t1[1][2] <= + 1.73333 * 1.0 - 1; t1[1][2] += 1.73333) {

      double res0[2][3] = {0};
      modulo = modulo > 24
        ? 0 : modulo + 1;
      if (modulo != 1) continue;
    memcpy(&t0, &_t0, sizeof t0);
      printf("  [");
      exportMAT33(t0);
      printf(", ");
      exportPV3(t1);
      printf(", ");
      iauRxpv(t0, t1, res0);
      exportPV3(res0);
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
  }
  }
  }

  printf("];\n");
}
