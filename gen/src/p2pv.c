/* Generate Test Data for p2pv */

#include <stdio.h>
#include "sofa.h"
#include "config.h"
#include <string.h>

int main()
{
  double t0[3];
  printf("var p2pv_results = [\n");
  for (t0[0] = -0.04124432; t0[0] <= 0.04124432; t0[0] += 0.03093324) {
  for (t0[1] = -0.04124432; t0[1] <= 0.04124432; t0[1] += 0.03093324) {
  for (t0[2] = -0.04124432; t0[2] <= 0.04124432; t0[2] += 0.03093324) {

    double res0[2][3] = {0};
    printf("  [");
    exportV3(t0);
    printf(", ");
    iauP2pv(t0, res0);
    exportPV3(res0);
    printf("  ],\n");

  }
  }
  }

  printf("];\n");
}
