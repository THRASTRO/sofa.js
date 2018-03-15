/* Generate Test Data for tpstv */

#include <stdio.h>
#include "sofa.h"
#include "config.h"
#include <string.h>

int main()
{
  double t0;
  double t1;
  double t2[3];
  printf("var tpstv_results = [\n");
  for (t0 = -12; t0 <= 12; t0 += 3.75) {
    for (t1 = -12; t1 <= 12; t1 += 3.75) {
      for (t2[0] = -0.04124432; t2[0] <= 0.04124432; t2[0] += 0.03093324) {
      for (t2[1] = -0.04124432; t2[1] <= 0.04124432; t2[1] += 0.03093324) {
      for (t2[2] = -0.04124432; t2[2] <= 0.04124432; t2[2] += 0.03093324) {

        double res0[3] = {0};
        printf("  [");
        printf("%.28e", t0);
        printf(", ");
        printf("%.28e", t1);
        printf(", ");
        exportV3(t2);
        printf(", ");
        iauTpstv(t0, t1, t2, res0);
        exportV3(res0);
        printf("  ],\n");

      }
      }
      }
    }
  }

  printf("];\n");
}
