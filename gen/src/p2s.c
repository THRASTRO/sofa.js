/* Generate Test Data for p2s */

#include <stdio.h>
#include "erfa.h"
#include "config.h"
#include <string.h>

int main()
{
  double t0[3];
  printf("var p2s_results = [\n");
  for (t0[0] = -0.04124432; t0[0] <= 0.04124432; t0[0] += 0.03093324) {
  for (t0[1] = -0.04124432; t0[1] <= 0.04124432; t0[1] += 0.03093324) {
  for (t0[2] = -0.04124432; t0[2] <= 0.04124432; t0[2] += 0.03093324) {

    double res0 = {0};
    double res1 = {0};
    double res2 = {0};
    printf("  [");
    exportV3(t0);
    printf(", ");
    eraP2s(t0, &res0, &res1, &res2);
    printf("%.28e", res0);
    printf(", ");
    printf("%.28e", res1);
    printf(", ");
    printf("%.28e", res2);
    printf("  ],\n");

  }
  }
  }

  printf("];\n");
}
