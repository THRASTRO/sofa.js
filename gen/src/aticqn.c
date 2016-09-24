/* Generate Test Data for aticqn */

#include <stdio.h>
#include "sofa.h"
#include "config.h"
#include <string.h>

int main()
{
  double t0;
  double t1;
  iauASTROM t2;
  int ti2;;
  int t3;
  int ti4;;
  iauLDBODY t4[100];;
  printf("var aticqn_results = [\n");
  for (t0 = -28; t0 <= 28; t0 += 28) {
    for (t1 = -28; t1 <= 28; t1 += 28) {
      for (ti2 = 0; ti2 <= 3; ti2 += 1) {
        for (t3 = 0; t3 <= 2; t3 += 1) {
          for (ti4 = 0; ti4 <= 1; ti4 += 1) {

            double res0 = {0};
            double res1 = {0};
            t4[3] = lbodys[0];
            t4[2] = lbodys[1];
            t4[1] = lbodys[2];
            t4[0] = lbodys[t3];
        t2 = astroms[ti2];
            printf("  [");
            printf("%.28e", t0);
            printf(", ");
            printf("%.28e", t1);
            printf(", ");
            exportASTROM(t2);
            printf(", ");
            printf("%d", t3);
            printf(", ");
            exportLDBODY(t3, t4);
            printf(", ");
            iauAticqn(t0, t1, &t2, t3, t4, &res0, &res1);
            printf("%.28e", res0);
            printf(", ");
            printf("%.28e", res1);
            printf("  ],\n");

          }
        }
      }
    }
  }

  printf("];\n");
}
