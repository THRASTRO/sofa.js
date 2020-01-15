/* Generate Test Data for pvup */

#include <stdio.h>
#include "erfa.h"
#include "config.h"
#include <string.h>

int main()
{
  double t0;
  double t1[2][3];
  printf("var pvup_results = [\n");
  for (t0 = -12; t0 <= 12; t0 += 3.75) {
    for (t1[0][0] = - 1.73333 * 0.0 - 1; t1[0][0] <= + 1.73333 * 1.0 - 1; t1[0][0] += 1.73333) {
    for (t1[1][0] = - 1.73333 * 0.0 - 1; t1[1][0] <= + 1.73333 * 1.0 - 1; t1[1][0] += 1.73333) {
    for (t1[0][1] = - 1.73333 * 0.0 - 1; t1[0][1] <= + 1.73333 * 1.0 - 1; t1[0][1] += 1.73333) {
    for (t1[1][1] = - 1.73333 * 0.0 - 1; t1[1][1] <= + 1.73333 * 1.0 - 1; t1[1][1] += 1.73333) {
    for (t1[0][2] = - 1.73333 * 0.0 - 1; t1[0][2] <= + 1.73333 * 1.0 - 1; t1[0][2] += 1.73333) {
    for (t1[1][2] = - 1.73333 * 0.0 - 1; t1[1][2] <= + 1.73333 * 1.0 - 1; t1[1][2] += 1.73333) {

      double res0[3] = {0};
      printf("  [");
      printf("%.28e", t0);
      printf(", ");
      exportPV3(t1);
      printf(", ");
      eraPvup(t0, t1, res0);
      exportV3(res0);
      printf("  ],\n");

    }
    }
    }
    }
    }
    }
  }

  printf("];\n");
}
