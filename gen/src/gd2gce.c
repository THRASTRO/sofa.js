/* Generate Test Data for gd2gce */

#include <stdio.h>
#include "erfa.h"
#include "config.h"
#include <string.h>

int main()
{
  double t0;
  double t1;
  double t2;
  double t3;
  double t4;
  unsigned long long modulo = 0;
  printf("var gd2gce_results = [\n");
  for (t0 = -12; t0 <= 12; t0 += 3.75) {
    for (t1 = -12; t1 <= 12; t1 += 3.75) {
      for (t2 = -12; t2 <= 12; t2 += 3.75) {
        for (t3 = -12; t3 <= 12; t3 += 3.75) {
          for (t4 = -12; t4 <= 12; t4 += 3.75) {

            double res0[3] = {0};
            modulo = modulo > 120
              ? 0 : modulo + 1;
            if (modulo != 1) continue;
            printf("  [");
            printf("%.28e", t0);
            printf(", ");
            printf("%.28e", t1);
            printf(", ");
            printf("%.28e", t2);
            printf(", ");
            printf("%.28e", t3);
            printf(", ");
            printf("%.28e", t4);
            printf(", ");
            printf("%d", eraGd2gce(t0, t1, t2, t3, t4, res0));
            printf(", ");
            exportV3(res0);
            printf("  ],\n");

          }
        }
      }
    }
  }

  printf("];\n");
}
