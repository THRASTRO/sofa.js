/* Generate Test Data for p06e */

#include <stdio.h>
#include "sofa.h"
#include "config.h"
#include <string.h>

int main()
{
  double t0;
  double t1;
  printf("var p06e_results = [\n");
  for (t0 = 1955545; t0 <= 2947545; t0 += 124000) {
    for (t1 = 1955545; t1 <= 2947545; t1 += 124000) {

      double res0 = {0};
      double res1 = {0};
      double res2 = {0};
      double res3 = {0};
      double res4 = {0};
      double res5 = {0};
      double res6 = {0};
      double res7 = {0};
      double res8 = {0};
      double res9 = {0};
      double res10 = {0};
      double res11 = {0};
      double res12 = {0};
      double res13 = {0};
      double res14 = {0};
      double res15 = {0};
      printf("  [");
      printf("%.28e", t0);
      printf(", ");
      printf("%.28e", t1);
      printf(", ");
      iauP06e(t0, t1, &res0, &res1, &res2, &res3, &res4, &res5, &res6, &res7, &res8, &res9, &res10, &res11, &res12, &res13, &res14, &res15);
      printf("%.28e", res0);
      printf(", ");
      printf("%.28e", res1);
      printf(", ");
      printf("%.28e", res2);
      printf(", ");
      printf("%.28e", res3);
      printf(", ");
      printf("%.28e", res4);
      printf(", ");
      printf("%.28e", res5);
      printf(", ");
      printf("%.28e", res6);
      printf(", ");
      printf("%.28e", res7);
      printf(", ");
      printf("%.28e", res8);
      printf(", ");
      printf("%.28e", res9);
      printf(", ");
      printf("%.28e", res10);
      printf(", ");
      printf("%.28e", res11);
      printf(", ");
      printf("%.28e", res12);
      printf(", ");
      printf("%.28e", res13);
      printf(", ");
      printf("%.28e", res14);
      printf(", ");
      printf("%.28e", res15);
      printf("  ],\n");

    }
  }

  printf("];\n");
}
