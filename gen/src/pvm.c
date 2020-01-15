/* Generate Test Data for pvm */

#include <stdio.h>
#include "erfa.h"
#include "config.h"
#include <string.h>

int main()
{
  double t0[2][3];
  printf("var pvm_results = [\n");
  for (t0[0][0] = - 1.73333 * 0.0 - 1; t0[0][0] <= + 1.73333 * 1.0 - 1; t0[0][0] += 1.73333) {
  for (t0[1][0] = - 1.73333 * 0.0 - 1; t0[1][0] <= + 1.73333 * 1.0 - 1; t0[1][0] += 1.73333) {
  for (t0[0][1] = - 1.73333 * 0.0 - 1; t0[0][1] <= + 1.73333 * 1.0 - 1; t0[0][1] += 1.73333) {
  for (t0[1][1] = - 1.73333 * 0.0 - 1; t0[1][1] <= + 1.73333 * 1.0 - 1; t0[1][1] += 1.73333) {
  for (t0[0][2] = - 1.73333 * 0.0 - 1; t0[0][2] <= + 1.73333 * 1.0 - 1; t0[0][2] += 1.73333) {
  for (t0[1][2] = - 1.73333 * 0.0 - 1; t0[1][2] <= + 1.73333 * 1.0 - 1; t0[1][2] += 1.73333) {

    double res0 = {0};
    double res1 = {0};
    printf("  [");
    exportPV3(t0);
    printf(", ");
    eraPvm(t0, &res0, &res1);
    printf("%.28e", res0);
    printf(", ");
    printf("%.28e", res1);
    printf("  ],\n");

  }
  }
  }
  }
  }
  }

  printf("];\n");
}
