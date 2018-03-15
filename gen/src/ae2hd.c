/* Generate Test Data for ae2hd */

#include <stdio.h>
#include "sofa.h"
#include "config.h"
#include <string.h>

int main()
{
  double t0;
  double t1;
  double t2;
  printf("var ae2hd_results = [\n");
  for (t0 = - 180; t0 <= + 180; t0 += 180 / 3.0) {
    for (t1 = - 180; t1 <= + 180; t1 += 180 / 3.0) {
      for (t2 = - 180; t2 <= + 180; t2 += 180 / 3.0) {

        double res0 = {0};
        double res1 = {0};
        printf("  [");
        printf("%.28e", t0);
        printf(", ");
        printf("%.28e", t1);
        printf(", ");
        printf("%.28e", t2);
        printf(", ");
        iauAe2hd(t0, t1, t2, &res0, &res1);
        printf("%.28e", res0);
        printf(", ");
        printf("%.28e", res1);
        printf("  ],\n");

      }
    }
  }

  printf("];\n");
}
