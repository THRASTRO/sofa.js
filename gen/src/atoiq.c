/* Generate Test Data for atoiq */

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
  iauASTROM t3;
  int ti3;;
  printf("var atoiq_results = [\n");
  for (ti0 = 0; ti0 <= 2; ti0 += 1) { t0 = tcoordt[ti0];
    for (t1 = -28; t1 <= 28; t1 += 21) {
      for (t2 = -28; t2 <= 28; t2 += 21) {
        for (ti3 = 0; ti3 <= 3; ti3 += 1) {

          double res0 = {0};
          double res1 = {0};
          t3 = astroms[ti3];
          printf("  [");
          printf("'%s'", t0);
          printf(", ");
          printf("%.28e", t1);
          printf(", ");
          printf("%.28e", t2);
          printf(", ");
          exportASTROM(t3);
          printf(", ");
          iauAtoiq(t0, t1, t2, &t3, &res0, &res1);
          printf("%.28e", res0);
          printf(", ");
          printf("%.28e", res1);
          printf("  ],\n");

        }
      }
    }
  }

  printf("];\n");
}
