/* Generate Test Data for gc2gde */

#include <stdio.h>
#include "sofa.h"
#include "config.h"
#include <string.h>

int main()
{
  double t0;
  double t1;
  double t2[3];
  unsigned long long modulo = 0;
  printf("var gc2gde_results = [\n");
  for (t0 = -12; t0 <= 12; t0 += 3.75) {
    for (t1 = -28; t1 <= 28; t1 += 21) {
      for (t2[0] = -0.04124432; t2[0] <= 0.04124432; t2[0] += 0.03093324) {
      for (t2[1] = -0.04124432; t2[1] <= 0.04124432; t2[1] += 0.03093324) {
      for (t2[2] = -0.04124432; t2[2] <= 0.04124432; t2[2] += 0.03093324) {

        double res0 = {0};
        double res1 = {0};
        double res2 = {0};
        modulo = modulo > 10
          ? 0 : modulo + 1;
        if (modulo != 1) continue;
        printf("  [");
        printf("%.28e", t0);
        printf(", ");
        printf("%.28e", t1);
        printf(", ");
        exportV3(t2);
        printf(", ");
        printf("%d", iauGc2gde(t0, t1, t2, &res0, &res1, &res2));
        printf(", ");
        printf("%.28e", res0);
        printf(", ");
        printf("%.28e", res1);
        printf(", ");
        printf("%.28e", res2);
        printf("  ],\n");

      }
      }
      }
    }
  }

  printf("];\n");
}
