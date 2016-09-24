/* Generate Test Data for pv2s */

#include <stdio.h>
#include "sofa.h"
#include "config.h"
#include <string.h>

int main()
{
  double t0[2][3];
  printf("var pv2s_results = [\n");
  for (t0[0][0] = - 1.73333 * 0.0 - 1; t0[0][0] <= + 1.73333 * 1.0 - 1; t0[0][0] += 1.73333) {
  for (t0[1][0] = - 1.73333 * 0.0 - 1; t0[1][0] <= + 1.73333 * 1.0 - 1; t0[1][0] += 1.73333) {
  for (t0[0][1] = - 1.73333 * 0.0 - 1; t0[0][1] <= + 1.73333 * 1.0 - 1; t0[0][1] += 1.73333) {
  for (t0[1][1] = - 1.73333 * 0.0 - 1; t0[1][1] <= + 1.73333 * 1.0 - 1; t0[1][1] += 1.73333) {
  for (t0[0][2] = - 1.73333 * 0.0 - 1; t0[0][2] <= + 1.73333 * 1.0 - 1; t0[0][2] += 1.73333) {
  for (t0[1][2] = - 1.73333 * 0.0 - 1; t0[1][2] <= + 1.73333 * 1.0 - 1; t0[1][2] += 1.73333) {

    double res0 = {0};
    double res1 = {0};
    double res2 = {0};
    double res3 = {0};
    double res4 = {0};
    double res5 = {0};
    printf("  [");
    exportPV3(t0);
    printf(", ");
    iauPv2s(t0, &res0, &res1, &res2, &res3, &res4, &res5);
    printf("%.28e", res0);
    printf(", ");
    printf("%.28e", res1);
    printf(", ");
    printf("%.28e", res2);
    printf(", ");
    printf("%.28e", res3);
    printf(", ");
    printf("%.28e", res4);
    printf(", ");
    printf("%.28e", res5);
    printf("  ],\n");

  }
  }
  }
  }
  }
  }

  printf("];\n");
}
