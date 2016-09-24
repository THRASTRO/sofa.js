/* Generate Test Data for numat */

#include <stdio.h>
#include "sofa.h"
#include "config.h"
#include <string.h>

int main()
{
  double t0;
  double t1;
  double t2;
  printf("var numat_results = [\n");
  for (t0 = - 180; t0 <= + 180; t0 += 180 / 2.0) {
    for (t1 = - 180; t1 <= + 180; t1 += 180 / 2.0) {
      for (t2 = - 180; t2 <= + 180; t2 += 180 / 2.0) {

        double res0[3][3] = {0};
        printf("  [");
        printf("%.28e", t0);
        printf(", ");
        printf("%.28e", t1);
        printf(", ");
        printf("%.28e", t2);
        printf(", ");
        iauNumat(t0, t1, t2, res0);
        exportMAT33(res0);
        printf("  ],\n");

      }
    }
  }

  printf("];\n");
}
