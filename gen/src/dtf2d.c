/* Generate Test Data for dtf2d */

#include <stdio.h>
#include "sofa.h"
#include "config.h"
#include <string.h>

int main()
{
  const char* t0;
  int ti0;;
  double t1;
  double t2;
  double t3;
  int t4;
  int t5;
  double t6;
  unsigned long long modulo = 0;
  printf("var dtf2d_results = [\n");
  for (ti0 = 0; ti0 <= 1; ti0 += 1) { t0 = tscale[ti0];
    for (t1 = 0.0 - 36.0 * 5.0; t1 <= 0.0 + 36.0 * 5.0; t1 += 36.0) {
      for (t2 = 0.0 - 36.0 * 5.0; t2 <= 0.0 + 36.0 * 5.0; t2 += 36.0) {
        for (t3 = 0.0 - 36.0 * 5.0; t3 <= 0.0 + 36.0 * 5.0; t3 += 36.0) {
          for (t4 = -96; t4 <= 96; t4 += 32) {
            for (t5 = -96; t5 <= 96; t5 += 32) {
              for (t6 = -12; t6 <= 12; t6 += 3.75) {

                double res0 = {0};
                double res1 = {0};
                modulo = modulo > 2218
                  ? 0 : modulo + 1;
                if (modulo != 1) continue;
                printf("  [");
                printf("'%s'", t0);
                printf(", ");
                printf("%.28e", t1);
                printf(", ");
                printf("%.28e", t2);
                printf(", ");
                printf("%.28e", t3);
                printf(", ");
                printf("%d", t4);
                printf(", ");
                printf("%d", t5);
                printf(", ");
                printf("%.28e", t6);
                printf(", ");
                printf("%d", iauDtf2d(t0, t1, t2, t3, t4, t5, t6, &res0, &res1));
                printf(", ");
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
  }

  printf("];\n");
}
