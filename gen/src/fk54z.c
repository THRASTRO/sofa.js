/* Generate Test Data for fk54z */

#include <stdio.h>
#include "erfa.h"
#include "config.h"
#include <string.h>

int main()
{
  double t0;
  double t1;
  double t2;
  printf("var fk54z_results = [\n");
  for (t0 = -28; t0 <= 28; t0 += 21) {
    for (t1 = -28; t1 <= 28; t1 += 21) {
      for (t2 = -28; t2 <= 28; t2 += 21) {

        double res0 = {0};
        double res1 = {0};
        double res2 = {0};
        double res3 = {0};
        printf("  [");
        printf("%.28e", t0);
        printf(", ");
        printf("%.28e", t1);
        printf(", ");
        printf("%.28e", t2);
        printf(", ");
        eraFk54z(t0, t1, t2, &res0, &res1, &res2, &res3);
        printf("%.28e", res0);
        printf(", ");
        printf("%.28e", res1);
        printf(", ");
        printf("%.28e", res2);
        printf(", ");
        printf("%.28e", res3);
        printf("  ],\n");

      }
    }
  }

  printf("];\n");
}
