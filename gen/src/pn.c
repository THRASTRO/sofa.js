/* Generate Test Data for pn */

#include <stdio.h>
#include "sofa.h"
#include "config.h"
#include <string.h>

int main()
{
  double t0[3];
  printf("var pn_results = [\n");
  for (t0[0] = -0.04124432; t0[0] <= 0.04124432; t0[0] += 0.03093324) {
  for (t0[1] = -0.04124432; t0[1] <= 0.04124432; t0[1] += 0.03093324) {
  for (t0[2] = -0.04124432; t0[2] <= 0.04124432; t0[2] += 0.03093324) {

    double res0 = {0};
    double res1[3] = {0};
    printf("  [");
    exportV3(t0);
    printf(", ");
    iauPn(t0, &res0, res1);
    printf("%.28e", res0);
    printf(", ");
    exportV3(res1);
    printf("  ],\n");

  }
  }
  }

  printf("];\n");
}
