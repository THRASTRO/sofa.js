/* Generate Test Data for pxp */

#include <stdio.h>
#include "erfa.h"
#include "config.h"
#include <string.h>

int main()
{
  double t0[3];
  double t1[3];
  printf("var pxp_results = [\n");
  long mod0 = 0;
  for (t0[0] = -0.04124432; t0[0] <= 0.04124432; t0[0] += 0.03093324) {
  for (t0[1] = -0.04124432; t0[1] <= 0.04124432; t0[1] += 0.03093324) {
  for (t0[2] = -0.04124432; t0[2] <= 0.04124432; t0[2] += 0.03093324) {
    mod0 ++;
    if (mod0 > 64) mod0 = 0;
    if (mod0 != 1) continue;
    long mod1 = 0;
    for (t1[0] = -0.04124432; t1[0] <= 0.04124432; t1[0] += 0.03093324) {
    for (t1[1] = -0.04124432; t1[1] <= 0.04124432; t1[1] += 0.03093324) {
    for (t1[2] = -0.04124432; t1[2] <= 0.04124432; t1[2] += 0.03093324) {
      mod1 ++;
      if (mod1 > 64) mod1 = 0;
      if (mod1 != 1) continue;

      double res0[3] = {0};
      printf("  [");
      exportV3(t0);
      printf(", ");
      exportV3(t1);
      printf(", ");
      eraPxp(t0, t1, res0);
      exportV3(res0);
      printf("  ],\n");

    }
    }
    }
  }
  }
  }

  printf("];\n");
}
