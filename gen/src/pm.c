/* Generate Test Data for pm */

#include <stdio.h>
#include "sofa.h"
#include "config.h"
#include <string.h>

int main()
{
  double t0[3];
  printf("var pm_results = [\n");
  for (t0[0] = -0.04124432; t0[0] <= 0.04124432; t0[0] += 0.03093324) {
  for (t0[1] = -0.04124432; t0[1] <= 0.04124432; t0[1] += 0.03093324) {
  for (t0[2] = -0.04124432; t0[2] <= 0.04124432; t0[2] += 0.03093324) {


    printf("  [");
    exportV3(t0);
    printf(", ");
    printf("%.28e", iauPm(t0));
    printf("  ],\n");

  }
  }
  }

  printf("];\n");
}
