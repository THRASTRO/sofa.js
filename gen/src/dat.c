/* Generate Test Data for dat */

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
  unsigned long long modulo = 0;
  printf("var dat_results = [\n");
  for (t0 = 0.0 - 36.0 * 5.0; t0 <= 0.0 + 36.0 * 5.0; t0 += 36.0) {
    for (t1 = 0.0 - 36.0 * 5.0; t1 <= 0.0 + 36.0 * 5.0; t1 += 36.0) {
      for (t2 = 0.0 - 36.0 * 5.0; t2 <= 0.0 + 36.0 * 5.0; t2 += 36.0) {
        for (t3 = -12; t3 <= 12; t3 += 3.75) {

          double res0 = {0};
          modulo = modulo > 12
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
          printf("%d", eraDat(t0, t1, t2, t3, &res0));
          printf(", ");
          printf("%.28e", res0);
          printf("  ],\n");

        }
      }
    }
  }

  printf("];\n");
}
