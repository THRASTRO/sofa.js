/* Generate Test Data for sxp */

#include <stdio.h>
#include "erfa.h"
#include "config.h"
#include <string.h>

int main()
{
  double t0;
  double t1[3];
  printf("var sxp_results = [\n");
  for (t0 = -12; t0 <= 12; t0 += 3.75) {
    for (t1[0] = -0.04124432; t1[0] <= 0.04124432; t1[0] += 0.03093324) {
    for (t1[1] = -0.04124432; t1[1] <= 0.04124432; t1[1] += 0.03093324) {
    for (t1[2] = -0.04124432; t1[2] <= 0.04124432; t1[2] += 0.03093324) {

      double res0[3] = {0};
      printf("  [");
      printf("%.28e", t0);
      printf(", ");
      exportV3(t1);
      printf(", ");
      eraSxp(t0, t1, res0);
      exportV3(res0);
      printf("  ],\n");

    }
    }
    }
  }

  printf("];\n");
}
