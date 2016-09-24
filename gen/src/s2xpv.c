/* Generate Test Data for s2xpv */

#include <stdio.h>
#include "sofa.h"
#include "config.h"
#include <string.h>

int main()
{
  double t0;
  double t1;
  double t2[2][3];
  unsigned long long modulo = 0;
  printf("var s2xpv_results = [\n");
  for (t0 = -12; t0 <= 12; t0 += 3.75) {
    for (t1 = -12; t1 <= 12; t1 += 3.75) {
      for (t2[0][0] = - 1.73333 * 0.0 - 1; t2[0][0] <= + 1.73333 * 1.0 - 1; t2[0][0] += 1.73333) {
      for (t2[1][0] = - 1.73333 * 0.0 - 1; t2[1][0] <= + 1.73333 * 1.0 - 1; t2[1][0] += 1.73333) {
      for (t2[0][1] = - 1.73333 * 0.0 - 1; t2[0][1] <= + 1.73333 * 1.0 - 1; t2[0][1] += 1.73333) {
      for (t2[1][1] = - 1.73333 * 0.0 - 1; t2[1][1] <= + 1.73333 * 1.0 - 1; t2[1][1] += 1.73333) {
      for (t2[0][2] = - 1.73333 * 0.0 - 1; t2[0][2] <= + 1.73333 * 1.0 - 1; t2[0][2] += 1.73333) {
      for (t2[1][2] = - 1.73333 * 0.0 - 1; t2[1][2] <= + 1.73333 * 1.0 - 1; t2[1][2] += 1.73333) {

        double res0[2][3] = {0};
        modulo = modulo > 4
          ? 0 : modulo + 1;
        if (modulo != 1) continue;
        printf("  [");
        printf("%.28e", t0);
        printf(", ");
        printf("%.28e", t1);
        printf(", ");
        exportPV3(t2);
        printf(", ");
        iauS2xpv(t0, t1, t2, res0);
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

  printf("];\n");
}
