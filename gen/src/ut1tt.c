/* Generate Test Data for ut1tt */

#include <stdio.h>
#include "erfa.h"
#include "config.h"
#include <string.h>

int main()
{
  double t0;
  double t1;
  double t2;
  printf("var ut1tt_results = [\n");
  for (t0 = -1332; t0 <= 1332; t0 += 666) {
    for (t1 = -3; t1 <= 3; t1 += 0.75) {
      for (t2 = -1; t2 <= 1; t2 += 0.25) {

        double res0 = {0};
        double res1 = {0};
        printf("  [");
        printf("%.28e", t0);
        printf(", ");
        printf("%.28e", t1);
        printf(", ");
        printf("%.28e", t2);
        printf(", ");
        printf("%d", eraUt1tt(t0, t1, t2, &res0, &res1));
        printf(", ");
        printf("%.28e", res0);
        printf(", ");
        printf("%.28e", res1);
        printf("  ],\n");

      }
    }
  }

  printf("];\n");
}
